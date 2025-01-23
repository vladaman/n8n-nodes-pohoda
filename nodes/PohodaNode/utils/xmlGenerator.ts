import {create} from 'xmlbuilder2';
import iconv from "iconv-lite";

export interface ListInvoicesFilter {
	id?: string;
	extId?: string;
	dateFrom?: string;
	dateTill?: string;
	lastChanges?: string;
	companyName?: string;
	selectedIco?: string;
	count?: number;
	idFrom?: number;
}

export interface ListLimit {
	count?: number;
	idFrom?: number;
}

export function generateListRequest(entityIco: string, actionEntity: string, listAttrs: any, filter: ListInvoicesFilter, limit: ListLimit): string {
	const {id, extId, dateFrom, dateTill, lastChanges, selectedIco, companyName} = filter;

	let reqEntity = listAttrs.request;
	delete listAttrs.request;

	// Create the XML document
	const xml = create({version: '1.0', encoding: 'Windows-1250'})
		.ele('dat:dataPack', {
			id: '001',
			ico: entityIco,
			application: 'NodeJS',
			version: '2.0',
			note: 'List Request from N8N',
			'xmlns:dat': 'http://www.stormware.cz/schema/version_2/data.xsd',
			'xmlns:ftr': 'http://www.stormware.cz/schema/version_2/filter.xsd',
			'xmlns:lst': 'http://www.stormware.cz/schema/version_2/list.xsd',
			'xmlns:typ': 'http://www.stormware.cz/schema/version_2/type.xsd',
		})
		.ele('dat:dataPackItem', {id: 'n8n-list1', version: '2.0'})
		.ele('lst:' + actionEntity, listAttrs);

	if (limit && (limit.count || limit.idFrom)) {
		const limitElement = xml.ele('lst:limit');
		if (limit.count) {
			limitElement.ele('ftr:count').txt(limit.count.toString()).up();
		}
		if (limit.idFrom != null) {
			limitElement.ele('ftr:idFrom').txt(limit.idFrom.toString()).up();
		}
		limitElement.up();
	}

	const requestElement = xml.ele(reqEntity);
	const filterElement = requestElement.ele('ftr:filter');

	// Add filter elements dynamically
	if (id) filterElement.ele('ftr:id').txt(id).up();
	if (extId) filterElement.ele('ftr:extId').txt(extId).up();
	if (dateFrom) filterElement.ele('ftr:dateFrom').txt(dateFrom).up();
	if (dateTill) filterElement.ele('ftr:dateTill').txt(dateTill).up();
	if (lastChanges) filterElement.ele('ftr:lastChanges').txt(lastChanges).up();
	if (companyName) filterElement.ele('ftr:selectedCompanys').ele('ftr:company').txt(iconv.encode(companyName, "win1250")).up();
	if (selectedIco) filterElement.ele('ftr:selectedIco').ele('ftr:ico').txt(selectedIco).up();

	filterElement.up();
	requestElement.up();

	return xml.end({prettyPrint: true});
}
