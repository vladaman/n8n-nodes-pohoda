import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon
} from 'n8n-workflow';

export class PohodaAuthApi implements ICredentialType {
	name = 'pohodaAuthApi';
	displayName = 'Pohoda mServer API';
	documentationUrl = 'https://github.com/vladaman/n8n-nodes-pohoda';
	icon: Icon = 'file:pohodaNode.png';
	properties: INodeProperties[] = [
		{
			displayName: 'Company ICO',
			name: 'ico',
			type: 'string',
			validateType: 'string-alphanumeric',
			default: '',
			typeOptions: {
				password: false,
			}
		},
		{
			displayName: 'Username',
			name: 'username',
			type: 'string',
			default: '@',
			typeOptions: {
				password: false,
			}
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Pohoda mServer Url',
			name: 'baseUrl',
			type: 'string',
			default: 'http://10.0.1.12:3888',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				// Encode in base64
				Authorization: '={{"Basic " + Buffer.from($credentials.username + ":" + $credentials.password).toString("base64")}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.baseUrl}}',
			// url: '/status?companyDetail',
			url: '/status',
			method: "GET"
		},
	};
}
