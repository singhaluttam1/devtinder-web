import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'

const Premium = () => {
const handleByClick = async (type) => {
  try {
    const res = await axios.post(BASE_URL + '/payment/create',
        
      { membershipType: type },
      { withCredentials: true } // fixed capital 'C'
    )

    const { amount, currency, notes, keyId, orderId } = res.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Dev Tinder',
      description: 'Connect to other Developers',
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailID,
        contact: '9999999999'
      },
      theme: {
        color: '#F37254'
      }
    };

    const rzp = new window.Razorpay(options); // safer
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err.message || err);
    alert("Something went wrong during payment. Please try again.");
  }
}
    return (
        <div>
            <div className="flex w-full flex-col lg:flex-row items-stretch gap-4 p-6">
                {/* Gold Membership Card */}
                <div className="card bg-yellow-100 text-yellow-900 rounded-box shadow-lg grow h-auto p-6 flex flex-col justify-center items-center border border-yellow-300">
                    <h2 className="text-xl font-bold mb-2">🥇 Gold Membership</h2>
                    <p className="text-sm text-center">Full access with premium features. Best for power users.</p>
                    <p className="text-sm text-center">• Unlimited swipe access</p>
                    <p className="text-sm text-center">• See who liked your profile</p>
                    <p className="text-sm text-center">• Priority in matchmaking algorithm</p>
                    <p className="text-sm text-center">• Access advanced filters (location, interests)</p>
                    <p className="text-sm text-center">• Completely ad-free experience</p>
                    <p className="text-sm text-center">• Weekly profile boosts</p>
                    <button onClick={() => handleByClick("gold")} className='btn btn-primary m-auto'>Buy Gold</button>

                </div>

                {/* Divider */}
                <div className="divider lg:divider-horizontal text-base font-semibold text-gray-500">OR</div>

                {/* Silver Membership Card */}
                <div className="card bg-gray-100 text-gray-800 rounded-box shadow-lg grow h-auto p-6 flex flex-col justify-center items-center border border-slate-300">
                    <h2 className="text-xl font-bold mb-2">🥈 Silver Membership</h2>
                    <p className="text-sm text-center">Basic access with limited features. Ideal for casual users.</p>
                    <p className="text-sm text-center">• Limited daily swipe access</p>
                    <p className="text-sm text-center">• View profiles but cannot see who liked you</p>
                    <p className="text-sm text-center">• Basic matchmaking algorithm</p>
                    <p className="text-sm text-center">• Access to standard filters only</p>
                    <p className="text-sm text-center">• Ads may be displayed</p>
                    <button onClick={() => handleByClick("silver")} className='btn btn-secoundary m-auto'>Buy Silver</button>
                </div>
            </div>
        </div>
    )
}

export default Premium
