import { css } from "@emotion/react";
import {
    Card,
    CardContent,
    CircularProgress,
    LinearProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import axios from "axios";
import type { NextPage } from "next";
import { useQuery } from "react-query";

const Home: NextPage = () => {
    const { data } = useQuery("", () => axios.get("/api/news"), {
        refetchInterval: 1000,
    });

    if (!data)
        return (
            <div
                css={{
                    width: "100vw",
                    height: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <CircularProgress />
            </div>
        );
    const isLee =
        parseFloat(data.data.DUGYUL01) - parseFloat(data.data.DUGYUL02) > 0;

    return (
        <div css={containerStyle}>
            <p
                css={{
                    fontSize: "20px",
                    color: isLee ? "blue" : "red",
                }}
            >
                {isLee ? "이재명 우세" : "윤석열 우세"}
            </p>
            <Card>
                <CardContent>
                    <p>
                        득표율 차이:{" "}
                        {Math.abs(
                            parseFloat(data.data.DUGYUL01) -
                                parseFloat(data.data.DUGYUL02)
                        ).toLocaleString()}
                        %
                    </p>
                    <p>
                        표차이:{" "}
                        {Math.abs(
                            parseInt(data.data.DUGSU01.replaceAll(",", "")) -
                                parseInt(data.data.DUGSU02.replaceAll(",", ""))
                        ).toLocaleString()}
                    </p>
                    <p>개표율: {data.data.GAEPYOYUL}%</p>
                </CardContent>
            </Card>
            <br />
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>표수</TableCell>
                            <TableCell>비율</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>이재명</TableCell>
                            <TableCell>{data.data.DUGSU01}</TableCell>
                            <TableCell>{data.data.DUGYUL01}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>윤석열</TableCell>
                            <TableCell>{data.data.DUGSU02}</TableCell>
                            <TableCell>{data.data.DUGYUL02}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
};
const containerStyle = css`
    margin: 20px;
`;

export default Home;
