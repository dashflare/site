import React, { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
}

const formatPrice = (amount, currency) => {
  let price = (amount / 100).toFixed(2)
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  })
  return numberFormat.format(price)
}

const PlanCard = ({ product, pos }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setLoading(true)

    const price = new FormData(event.target).get("priceSelect")
    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price, quantity: 1 }],
      successUrl: `${window.location.origin}/page-2/`,
      cancelUrl: `${window.location.origin}/advanced`,
    })

    if (error) {
      console.warn("Error:", error)
      setLoading(false)
    }
  }

  return (
    <div
      className={
        "sm:flex-1 lg:flex-initial rounded-t-lg rounded-bl-lg bg-white flex flex-col p-8 w-1/3 justify-between " +
        (pos === 1 ? "-mt-4 -mb-8 rounded" : "mt-4 rounded-tr-none shadow-lg")
      }
    >
      <div>
        <div className="px-8 pt-8 pb-1 text-3xl font-bold text-center text-gray-800">
          {product.name}
        </div>
        <div className="flex flex-col justify-around">
          <div className="text-center px-8 text-xl mb-8 text-gray-800">
            {product.prices.map(price => (
              <div className="flex flex-col justify-center">
                <div className="flex justify-center">
                  <span className="mr-1 mt-2 text-2xl font-medium">&euro;</span>
                  <span className="text-5xl font-medium">
                    {(price.unit_amount / 100).toFixed(2)}
                  </span>
                </div>
                <span className="text-base -mt-1 mb-2 mt-auto text-gray-700">
                  per month
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="border-0 border-grey-light border-t border-solid text-sm mb-12">
        <div className="border-0 border-grey-light border-b border-solid py-4 flex items-center">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="badge-check w-8 h-8 inline mr-2 text-green-400 flex-shrink-0"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          {product.metadata.limit}
        </div>
        <div className="border-0 border-grey-light border-b border-solid py-4 flex items-center">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="badge-check w-8 h-8 inline mr-2 text-green-400 flex-shrink-0"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Unlimited websites
        </div>
        <div className="border-0 border-grey-light border-b border-solid py-4 flex">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            class="badge-check w-8 h-8 inline mr-2 text-green-400 flex-shrink-0"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Full access to the raw logs from your visitors
        </div>
      </div>

      <button
        disabled={loading}
        className="w-5/6 px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out self-center"
      >
        Sign Up
      </button>
    </div>
  )
}

export default PlanCard
