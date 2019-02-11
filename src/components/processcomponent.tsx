import * as React from "react";

import Button from "react-bootstrap/Button";
import { ProcessDataFetcher } from "../processdatafetcher";
import { IProcModel } from "../model";

export interface IProcessComponentProps extends React.Props<void> {
}

export interface IProcessComponentState {
    exportPath: string;
    processList: string;
}

export class ProcessExportComponent extends React.Component<IProcessComponentProps, IProcessComponentState> {
    constructor(props) {
        super(props);
        this.state = {
            exportPath: null,
            processList: null
        };
    }

    public fetchProcessData(): void {
        ProcessDataFetcher.getProcessData().then((model : IProcModel) => {
            this.setState({ 
                exportPath: '',
                processList: 'Fetching process data was successful...'
                });

            var data = new Blob([model.processList], {type: 'application/json'});
            var csvURL = window.URL.createObjectURL(data);
            var tempLink = document.createElement('a');
            tempLink.href = csvURL;
            tempLink.setAttribute('download', 'processes.json');
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
                    onClick = { () => this.fetchProcessData() }
                >
                Download process list
                </button>
                
                { this.state.processList }
            </div>
        );
    }
}