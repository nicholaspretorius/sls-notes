import handler from "./libs/handlerLib";
import stripePackage from "stripe";
import { calculateCost } from "./libs/billingsLib";
// import { success, failure } from "./libs/responseLib";
import { createLogger } from "./utils/logger";

const logger = createLogger("billings");

// TODO: Setup chargers DynamoDB Table to record charges per user

export const main = handler(async (event, context) => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch Charge";
  const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

  // try {
  const result = await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd"
  });

  const billingDetails = {
    id: result.id,
    type: result.object,
    amount: result.amount,
    paid: true,
    method: result.payment_method,
    card_type: result.payment_method_details.card.brand,
    receipt: result.receipt_url
  };

  logger.info("Successfully charged: ", { result, billingDetails });

  return {
    body: {
      result,
      billingDetails
    },
    statusCode: 200
  };

  // return success(200, { success: true, billing: billingDetails });
  // } catch (e) {
  //   logger.error("Error charging Stripe: ", { error: e });
  //   return failure(400, { error: e });
  // }
});
