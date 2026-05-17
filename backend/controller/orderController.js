import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import razorpay from 'razorpay'

const currency = 'inr'

// Lazy initialize Razorpay - only create instance when actually needed
const getRazorpayInstance = () => {
    // Trim any whitespace/newlines that might have been accidentally added in .env
    const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID?.trim();
    const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET?.trim();
    
    // Validate key formats
    if (RAZORPAY_KEY_ID && !RAZORPAY_KEY_ID.startsWith('rzp_')) {
        console.error('Invalid RAZORPAY_KEY_ID format - should start with "rzp_"');
    }
    
    if (RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET) {
        return new razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });
    }
    return null;
};

// for User
export const placeOrder = async (req,res) => {

     try {
         const {items , amount , address} = req.body;
         const userId = req.userId;
         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         await User.findByIdAndUpdate(userId,{cartData:{}})

         return res.status(201).json({message:'Order Place'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Order Place error'})
    }
    
}


export const placeOrderRazorpay = async (req,res) => {
    try {
         // Validate request body
         const {items , amount , address} = req.body;
         
         if (!items || !amount || !address) {
             console.error('Missing required fields in Razorpay order request');
             return res.status(400).json({ message: 'Missing required fields: items, amount, or address' });
         }
         
         if (!Array.isArray(items) || items.length === 0) {
             console.error('Items must be a non-empty array for Razorpay order');
             return res.status(400).json({ message: 'Items must be a non-empty array' });
         }
         
         if (typeof amount !== 'number' || amount <= 0) {
             console.error('Invalid amount for Razorpay order:', amount);
             return res.status(400).json({ message: 'Amount must be a positive number' });
         }

         const userId = req.userId;
         if (!userId) {
             console.error('userId not found in Razorpay order request');
             return res.status(401).json({ message: 'User not authenticated' });
         }

         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         const options = {
            amount: Math.round(amount * 100), // Razorpay requires amount in paise, ensure it's an integer
            currency: currency.toUpperCase(),
            receipt : newOrder._id.toString()
         }
         
         const razorpayInstance = getRazorpayInstance();
         if (!razorpayInstance) {
             console.error('Razorpay is not configured - missing API keys');
             return res.status(500).json({
                 success: false,
                 message: 'Razorpay payment is not configured on the server'
             });
         }
         
         // Use async/await instead of callback to properly handle errors
         try {
             const razorpayOrder = await razorpayInstance.orders.create(options);
             
             res.status(200).json({
                 success: true,
                 order: razorpayOrder,
                 dbOrderId: newOrder._id.toString()
             });
         } catch (error) {
             console.error('Razorpay API Error:', error);
             
             if (error.statusCode === 401) {
                 return res.status(401).json({
                     success: false,
                     message: 'Razorpay authentication failed - check your API keys',
                     error: process.env.NODE_ENV === 'development' ? error.message : undefined
                 });
             }
             
             throw error; // Re-throw to be caught by the outer try-catch
         }
         
    } catch (error) {
        console.error('Error in placeOrderRazorpay:', error);
        
        // Handle specific Razorpay errors
        if (error.message && error.message.includes('authentication')) {
            return res.status(401).json({
                success: false,
                message: 'Razorpay authentication failed - verify your API keys in .env file',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
        
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create Razorpay order',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}


export const verifyRazorpay = async (req,res) =>{
    try {
        const userId = req.userId
        const {razorpay_order_id} = req.body
        
        const razorpayInstance = getRazorpayInstance();
        if (!razorpayInstance) {
            console.error('Razorpay is not configured - missing API keys');
            return res.status(500).json({
                success: false,
                message: 'Razorpay payment is not configured on the server'
            });
        }
        
        if (!razorpay_order_id) {
            console.error('Missing razorpay_order_id in verification request');
            return res.status(400).json({ success: false, message: 'Missing razorpay_order_id' });
        }
        
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true});
            await User.findByIdAndUpdate(userId , {cartData:{}})
            res.status(200).json({success: true, message:'Payment Successful'});
        }
        else{
            res.status(400).json({success: false, message:'Payment not completed', status: orderInfo.status});
        }
    } catch (error) {
        console.error('Error in verifyRazorpay:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to verify payment',
            error: process.env.NODE_ENV === 'development' ? error : undefined
        });
    }
}






export const userOrders = async (req,res) => {
      try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
    }
    
}




//for Admin



    
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
    
}
    
export const updateStatus = async (req,res) => {
    
try {
    const {orderId , status} = req.body

    await Order.findByIdAndUpdate(orderId , { status })
    return res.status(201).json({message:'Status Updated'})
} catch (error) {
     return res.status(500).json({message:error.message
            })
}
}