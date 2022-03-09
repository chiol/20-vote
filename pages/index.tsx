import { css } from "@emotion/react";
import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";

const Home: NextPage = () => {
    const { data } = useQuery("", () => axios.get("/api/news"), {
        refetchInterval: 2000,
    });

    if (!data) return <></>;

    return (
        <div css={containerStyle}>
            <p>
                표차이:
                {(
                    parseInt(data.data.DUGSU01.replaceAll(",", "")) -
                    parseInt(data.data.DUGSU02.replaceAll(",", ""))
                ).toLocaleString()}
            </p>
            <p>
                개표율:
                {data.data.GAEPYOYUL}%
            </p>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td>표수</td>
                        <td>비율</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>이재명</td>
                        <td>{data.data.DUGSU01}</td>
                        <td>{data.data.DUGYUL01}</td>
                    </tr>
                    <tr>
                        <td>윤석열</td>
                        <td>{data.data.DUGSU02}</td>
                        <td>{data.data.DUGYUL02}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
const containerStyle = css`
    font-size: 32px;
`;

export default Home;
