import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PlanCard from "./PlanCard"

export default function Plans(props) {
  return (
    <StaticQuery
      query={graphql`
        query ProductPrices {
          prices: allStripePrice(
            filter: { active: { eq: true }, product: { active: { eq: true } } }
            sort: { fields: [unit_amount] }
          ) {
            edges {
              node {
                id
                active
                currency
                unit_amount
                product {
                  id
                  name
                  metadata {
                    limit
                  }
                }
              }
            }
          }
        }
      `}
      render={({ prices }) => {
        // Group prices by product
        const products = {}
        for (const { node: price } of prices.edges) {
          const product = price.product
          if (!products[product.id]) {
            products[product.id] = product
            products[product.id].prices = []
          }
          products[product.id].prices.push(price)
        }

        return (
          <div class="w-full bg-blue-500 h-screen pt-24">
            <div class="flex flex-col sm:flex-row justify-center mb-6 sm:mb-0">
              {Object.keys(products).map((key, idx) => (
                <PlanCard
                  key={products[key].id}
                  product={products[key]}
                  pos={idx}
                />
              ))}
            </div>
          </div>
        )
      }}
    />
  )
}
