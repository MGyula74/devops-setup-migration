import Q = require("q");

import CoreClient = require("TFS/Core/RestClient");
import { ITeamsModel } from "./model";

export class TeamDataFetcher {
    public static getData(projectId: string): IPromise<ITeamsModel> {
        let rclient = CoreClient.getClient();
        return rclient.getTeams(projectId).then(teams => {
            return <ITeamsModel>{
                teamList: JSON.stringify(teams)
            };
        });
    }
}