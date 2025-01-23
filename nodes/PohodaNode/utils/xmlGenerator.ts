import {create} from 'xmlbuilder2';
import iconv from "iconv-lite";

interface ListInvoicesFilter {
	id?: string;
	extId?: string;
	dateFrom?: string;
	dateTill?: string;
	lastChanges?: string;
	companyName?: string;
	selectedIco?: string;
	count?: number;
}

export function generateListInvoicesRequest(entityIcon: string, actionEntity: string, invoiceType: string, filter: ListInvoicesFilter): string {
	const {id, extId, dateFrom, dateTill, lastChanges, selectedIco, companyName, count} = filter;

	// Create the XML document
	const xml = create({version: '1.0', encoding: 'Windows-1250'})
		.ele('dat:dataPack', {
			id: '001',
			ico: entityIcon,
			application: 'NodeJS',
			version: '2.0',
			note: 'Invoice List Request from N8N',
			'xmlns:dat': 'http://www.stormware.cz/schema/version_2/data.xsd',
			'xmlns:ftr': 'http://www.stormware.cz/schema/version_2/filter.xsd',
			'xmlns:lst': 'http://www.stormware.cz/schema/version_2/list.xsd',
			'xmlns:typ': 'http://www.stormware.cz/schema/version_2/type.xsd',
		})
		.ele('dat:dataPackItem', {id: 'n8n-list1', version: '2.0'})
		.ele('lst:' + actionEntity, {version: '2.0', invoiceType: invoiceType, invoiceVersion: '2.0'})
		.ele('lst:limit').ele('ftr:count').txt(count ? count.toString() : "10").up().up() // Add the count element
		.ele('lst:requestInvoice')
		.ele('ftr:filter');

	// Add filter elements dynamically
	if (id) xml.ele('ftr:id').txt(id).up();
	if (extId) xml.ele('ftr:extId').txt(extId).up();
	if (dateFrom) xml.ele('ftr:dateFrom').txt(dateFrom).up();
	if (dateTill) xml.ele('ftr:dateTill').txt(dateTill).up();
	if (lastChanges) xml.ele('ftr:lastChanges').txt(lastChanges).up();
	if (companyName) xml.ele('ftr:selectedCompanys').ele('ftr:company').txt(iconv.encode(companyName, "win1250")).up();
	if (selectedIco) xml.ele('ftr:selectedIco').ele('ftr:ico').txt(selectedIco).up();


	// End the document
	return xml.end({prettyPrint: true});
}
