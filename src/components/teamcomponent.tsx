import * as React from "react";

import Button from "react-bootstrap/Button";
import { TeamDataFetcher } from "../teamsdatafetcher";
import { ITeamsModel } from "../model";

export interface ITeamComponentProps extends React.Props<void> {
}

export interface ITeamComponentState {
    teamList: string;
}

export class TeamExportComponent extends React.Component<ITeamComponentProps, ITeamComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            teamList: null
        };
    }

    public fetchData(): void {
        var context = VSS.getWebContext();
        TeamDataFetcher.getData(context.project.id).then((model : ITeamsModel) => {
            this.setState({ 
                teamList: 'Fetching team data was successful...'
            });

            var data = new Blob([model.teamList], {type: 'application/json'});
            var csvURL = window.URL.createObjectURL(data);
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'teams.json');
            tempLink.click();
        })
    }

    render(): JSX.Element {
        return (
            <div>
                {/* <span>Choose export path:</span>
                <input type='text' name='exportPath' /> */}

                <button
                    className = "square"
                    onClick = { () => this.fetchData() }
                >
                Download team list
                </button>

                { this.state.teamList }
            </div>
        );
    }
}