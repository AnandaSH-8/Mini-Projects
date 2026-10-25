import sampleData from "../aiData/sampleData.json";
import sampleProductData from "../aiData/sampleProductData.json";

export const UNKNOWN_RESPONSE = "Sorry, I did not understand your query!";

function normalize(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function getBotResponse(userInput, previousMessages = []) {
  const query = String(userInput ?? "")
    .trim()
    .replace(/\s+/g, " ");

  if (!query) {
    return { type: "unknown", text: UNKNOWN_RESPONSE };
  }

  // Step 1: Match a product category.
  const product = sampleData.find(
    (item) => normalize(item.question) === normalize(query),
  );

  if (product) {
    return {
      type: "budget",
      text: product.response,
      product: product.question,
    };
  }

  // Step 2: Find the most recent unanswered budget prompt.
  const lastBotBudget = [...previousMessages]
    .reverse()
    .find(
      (message) =>
        message.sender === "bot" &&
        message.type === "budget" &&
        message.product,
    );

  if (!lastBotBudget) {
    return { type: "unknown", text: UNKNOWN_RESPONSE };
  }

  // Step 3: Only accept budgets offered for that product.
  const budgetMatch = lastBotBudget.text
    .match(/\(([^)]+)\)/)?.[1]
    ?.split(",")
    .map((budget) => budget.trim())
    .find((budget) => normalize(budget) === normalize(query));

  if (!budgetMatch) {
    return { type: "unknown", text: UNKNOWN_RESPONSE };
  }

  // Step 4: Find the corresponding recommendations.
  const productKey = `${lastBotBudget.product} ${budgetMatch}`;

  const recommendation = sampleProductData.find(
    (item) => normalize(item.question) === normalize(productKey),
  );

  if (!recommendation) {
    return { type: "unknown", text: UNKNOWN_RESPONSE };
  }

  return {
    type: "recommendation",
    text: recommendation.response,
    product: lastBotBudget.product,
    budget: budgetMatch,
  };
}
