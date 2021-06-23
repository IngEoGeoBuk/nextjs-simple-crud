import dbConnect from "../../../utils/dbConnect";
import Board from '../../../models/Board.js';

dbConnect();

export default async (req: any, res: any) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        // 게시판 하나만 불러오기(Details)
        case 'GET':
            try {
                const board = await Board.findById(id);
                if (!board) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: board })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}