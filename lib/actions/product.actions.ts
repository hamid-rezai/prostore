'use server';
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUSCTS_LIMIT } from "../constants";

// Get latest products
export async function getLatestProducts() {

  const data =  await prisma.product.findMany({
    take: LATEST_PRODUSCTS_LIMIT ,
    orderBy:{ createdAt:'desc'},
  })
  return convertToPlainObject(data);
}
// Get single product by its slug
export async function getProductBySlug (slug:string) {
  const data = await prisma.product.findFirst({
    where:{ slug: slug }
  })
  return convertToPlainObject(data);
}