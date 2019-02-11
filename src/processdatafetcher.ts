import Q = require("q");

import CoreClient = require("TFS/Core/RestClient");
import { IProcModel } from "./model";

export class ProcessDataFetcher {
    public static getProcessData(): IPromise<IProcModel> {
        let rclient = CoreClient.getClient();
        return rclient.getProcesses().then(proc => {
            return <IProcModel>{
                processList: JSON.stringify(proc)
            };
        });
    }
}