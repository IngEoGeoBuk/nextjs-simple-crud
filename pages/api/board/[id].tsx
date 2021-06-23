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
        // 게시글 수정
        case 'PUT':
            try {
                const updateBoard = await Board.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });
                if (!updateBoard) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: updateBoard })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        // 게시글 삭제
        case 'DELETE':
            try {
                const deletedBoard = await Board.deleteOne({ _id: id })
                if (!deletedBoard) {
                    return res.status(400).json({ success: false });
                }
                res.status(200).json({ success: true, data: {} })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;



        default:
            res.status(400).json({ success: false });
            break;
    }
}