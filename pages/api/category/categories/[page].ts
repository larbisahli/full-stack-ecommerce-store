import type { NextApiRequest, NextApiResponse } from 'next'
import Category from "repositories/category";

const {categories, GET} = new Category()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { query, method } = req
  const page = parseInt(query.page as string, 10)
  console.log({page, method})
  let results
  switch (method) {
    case GET:
      results = await categories({page})
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`There was some error!`)
  }
  console.log({results})
  if(results?.error){
      return res.status(500).json(results)
  }
  return res.status(200).json(results)
}