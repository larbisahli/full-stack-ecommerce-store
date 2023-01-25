import type { NextApiRequest, NextApiResponse } from 'next'
import Category from "repositories/category";

class Handler extends Category {
    constructor() {
        super();
      }

    public execute (req: NextApiRequest, res: NextApiResponse) {
        const { method, body } = req
        let results
        switch (method) {
          case this.POST:
            results = this.createCategory(body)
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