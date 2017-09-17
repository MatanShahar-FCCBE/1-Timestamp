import * as http from "http";
import * as moment from "moment";

interface IResponse {
    unix: number,
    natural: string
}

export default function server(req: http.IncomingMessage, res: http.ServerResponse): void 
{
    if(req.method != "GET")
    {
        res.statusCode = 405;
        res.end();
        return;
    }

    res.statusCode = 400;
    var response: IResponse = {
        unix: null,
        natural: null
    };

    var reqString = req.url ? req.url.substr(1) : "undefined";
    var date: moment.Moment;
    if(/^\d+$/.test(reqString)) {
        date = moment(reqString, "X");
    } else {
        date = moment(reqString, "MMMM D, YYYY");
    }

    if(date && date.isValid())
    {
        res.statusCode = 200;
        response.unix = date.unix();
        response.natural = date.format("MMMM D, YYYY");
    }

    res.setHeader('Content-Type', 'text/json');
    res.end(JSON.stringify(response));
}