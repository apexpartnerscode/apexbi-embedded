'use client'
import { useState } from 'react'
import { PowerBIEmbed } from 'powerbi-client-react';
import { models, Report, Embed, service, Page } from 'powerbi-client';

export default function Home() {
	const [report, setReport] = useState<Report>();

    const[eventHandlersMap, setEventHandlersMap] = useState<Map<string, (event?: service.ICustomEvent<any>, embeddedEntity?: Embed) => void | null>>(new Map([
		['loaded', () => console.log('Report has loaded')],
		['rendered', () => console.log('Report has rendered')],
		['error', (event?: service.ICustomEvent<any>) => {
				if (event) {
					console.error(event.detail);
				}
			},
		],
		['visualClicked', () => console.log('visual clicked')],
		['pageChanged', (event) => console.log(event)],
	]));
    return (
        <div className="h-screen w-screen">
            <PowerBIEmbed
                embedConfig={{
                    type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                    id: 'a4fc3710-21a0-48c0-a0ac-844b617e3275',
                    embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a4fc3710-21a0-48c0-a0ac-844b617e3275&groupId=124f88d3-8d5b-4438-996c-1fb90c106f35&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldCIsImVtYmVkRmVhdHVyZXMiOnsidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d',
                    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                    tokenType: models.TokenType.Aad,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false
                            }
                        },
                        background: models.BackgroundType.Transparent,
                    }
                }}
    
                eventHandlers={eventHandlersMap}
    
                cssClassName={"h-screen w-screen"}
    
                getEmbeddedComponent={(embeddedReport) => {
                    setReport(embeddedReport as Report);
                }}
            />
        </div>
    )
}