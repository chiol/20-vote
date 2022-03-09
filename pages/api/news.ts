/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> => {
    const params = new URLSearchParams();
    params.append("electionId", "0020220309");
    params.append("secondMenuId", "VCCP09");
    params.append("electionCode", "1");
    params.append("cityCode", "0");
    params.append("statementId", "VCCP09_#1");

    const response = await axios.post(
        "http://info.nec.go.kr/m/electioninfo/electionInfo_report.json",
        params
    );
    const data = response.data.jsonResult.body[0];
    const body = {
        DUGSU01: data.DUGSU01,
        DUGSU02: data.DUGSU02,
        DUGYUL01: data.DUGYUL01,
        DUGYUL02: data.DUGYUL02,
        GAEPYOYUL: data.GAEPYOYUL,
    };
    res.status(200).json(body);
};
