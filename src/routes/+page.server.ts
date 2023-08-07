import type { Actions } from "./$types";
import { error, redirect, type Redirect } from "@sveltejs/kit";
import Stripe from "stripe";
import { SECRET_STRIPE_KEY } from "$env/static/private";

const stripe = new Stripe(SECRET_STRIPE_KEY, { apiVersion: "2022-11-15" });

export const actions: Actions = {
  checkout: async ({ request }) => {
    let url: string | null;

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: "price_1NcRhmJFe4gSNa4MvClCB0Hq",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${request.headers.get("origin")}/?success=true`,
        cancel_url: `${request.headers.get("origin")}/?canceled=true`,
      });

      url = session.url;
    } catch (errorObj) {
      throw error(500, "Unknown error occurred");
    }

    if (url) {
      console.log(url);
      throw redirect(303, url);
    }
  },
};
