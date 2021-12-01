import axios from "axios";
import {apiUrl} from '../constants';

export async function getChartData(user) {
    const result = await axios.get(apiUrl);
    return result.data;
};
