import type { NextApiRequest, NextApiResponse } from 'next'
import Category from "repositories/category";

class Handler extends Category {
    constructor() {
        super();
      }

    public execute (req: NextApiRequest, res: NextApiResponse) {
        const { query, method } = req

        const id = query.id as string

        let results
        switch (method) {
          case 'GET':
            results = this.category({id})
            break
          default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`There was some error!`)
        }
        if(results?.error){
            return res.status(500).json(results?.error)
        }
        return res.status(200).json(results)
      }
}

export default new Handler().execute