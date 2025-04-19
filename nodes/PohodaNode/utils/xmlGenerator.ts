import {create} from 'xmlbuilder2';
import iconv from "iconv-lite";

export interface ListInvoicesFilter {
	id?: string;
	extId?: string;
	dateFrom?: string;
	dateTill?: string;
	lastChanges?: string;
	companyName?: string;
	ico?: string; // Used for Invoices and lst:
	count?: number;
	idFrom?: number;
}

export interface ListLimit {
	count?: number;
	idFrom?: number;
}

function createRootEnvelope(entityIco: string) {
	return create({version: '1.0', encoding: 'Windows-1250'})
		.ele('dat:dataPack', {
			id: '001',
			ico: entityIco,
			application: 'NodeJS',
			version: '2.0',
			note: 'Request from N8N',
			'xmlns:dat': 'http://www.stormware.cz/schema/version_2/data.xsd',
			'xmlns:lst': 'http://www.stormware.cz/schema/version_2/list.xsd',
			'xmlns:lAdb': "http://www.stormware.cz/schema/version_2/list_addBook.xsd",
			"xmlns:typ": "http://www.stormware.cz/schema/version_2/type.xsd",
			"xmlns:lStk": "http://www.stormware.cz/schema/version_2/list_stock.xsd",
			"xmlns:lCen": "http://www.stormware.cz/schema/version_2/list_centre.xsd",
			"xmlns:lAcv": "http://www.stormware.cz/schema/version_2/list_activity.xsd",
			"xmlns:acu": "http://www.stormware.cz/schema/version_2/accountingunit.xsd",
			"xmlns:inv": "http://www.stormware.cz/schema/version_2/invoice.xsd",
			"xmlns:vch": "http://www.stormware.cz/schema/version_2/voucher.xsd",
			"xmlns:int": "http://www.stormware.cz/schema/version_2/intDoc.xsd",
			"xmlns:stk": "http://www.stormware.cz/schema/version_2/stock.xsd",
			"xmlns:ord": "http://www.stormware.cz/schema/version_2/order.xsd",
			"xmlns:ofr": "http://www.stormware.cz/schema/version_2/offer.xsd",
			"xmlns:enq": "http://www.stormware.cz/schema/version_2/enquiry.xsd",
			"xmlns:vyd": "http://www.stormware.cz/schema/version_2/vydejka.xsd",
			"xmlns:pri": "http://www.stormware.cz/schema/version_2/prijemka.xsd",
			"xmlns:bal": "http://www.stormware.cz/schema/version_2/balance.xsd",
			"xmlns:pre": "http://www.stormware.cz/schema/version_2/prevodka.xsd",
			"xmlns:vyr": "http://www.stormware.cz/schema/version_2/vyroba.xsd",
			"xmlns:pro": "http://www.stormware.cz/schema/version_2/prodejka.xsd",
			"xmlns:con": "http://www.stormware.cz/schema/version_2/contract.xsd",
			"xmlns:adb": "http://www.stormware.cz/schema/version_2/addressbook.xsd",
			"xmlns:prm": "http://www.stormware.cz/schema/version_2/parameter.xsd",
			"xmlns:lCon": "http://www.stormware.cz/schema/version_2/list_contract.xsd",
			"xmlns:ctg": "http://www.stormware.cz/schema/version_2/category.xsd",
			"xmlns:ipm": "http://www.stormware.cz/schema/version_2/intParam.xsd",
			"xmlns:str": "http://www.stormware.cz/schema/version_2/storage.xsd",
			"xmlns:idp": "http://www.stormware.cz/schema/version_2/individualPrice.xsd",
			"xmlns:sup": "http://www.stormware.cz/schema/version_2/supplier.xsd",
			"xmlns:prn": "http://www.stormware.cz/schema/version_2/print.xsd",
			"xmlns:lck": "http://www.stormware.cz/schema/version_2/lock.xsd",
			"xmlns:isd": "http://www.stormware.cz/schema/version_2/isdoc.xsd",
			"xmlns:sEET": "http://www.stormware.cz/schema/version_2/sendEET.xsd",
			"xmlns:act": "http://www.stormware.cz/schema/version_2/accountancy.xsd",
			"xmlns:bnk": "http://www.stormware.cz/schema/version_2/bank.xsd",
			"xmlns:sto": "http://www.stormware.cz/schema/version_2/store.xsd",
			"xmlns:grs": "http://www.stormware.cz/schema/version_2/groupStocks.xsd",
			"xmlns:acp": "http://www.stormware.cz/schema/version_2/actionPrice.xsd",
			"xmlns:csh": "http://www.stormware.cz/schema/version_2/cashRegister.xsd",
			"xmlns:bka": "http://www.stormware.cz/schema/version_2/bankAccount.xsd",
			"xmlns:ilt": "http://www.stormware.cz/schema/version_2/inventoryLists.xsd",
			"xmlns:nms": "http://www.stormware.cz/schema/version_2/numericalSeries.xsd",
			"xmlns:pay": "http://www.stormware.cz/schema/version_2/payment.xsd",
			"xmlns:mKasa": "http://www.stormware.cz/schema/version_2/mKasa.xsd",
			"xmlns:gdp": "http://www.stormware.cz/schema/version_2/GDPR.xsd",
			"xmlns:est": "http://www.stormware.cz/schema/version_2/establishment.xsd",
			"xmlns:cen": "http://www.stormware.cz/schema/version_2/centre.xsd",
			"xmlns:acv": "http://www.stormware.cz/schema/version_2/activity.xsd",
			"xmlns:afp": "http://www.stormware.cz/schema/version_2/accountingFormOfPayment.xsd",
			"xmlns:vat": "http://www.stormware.cz/schema/version_2/classificationVAT.xsd",
			"xmlns:rgn": "http://www.stormware.cz/schema/version_2/registrationNumber.xsd",
			"xmlns:ftr": "http://www.stormware.cz/schema/version_2/filter.xsd",
			"xmlns:asv": "http://www.stormware.cz/schema/version_2/accountingSalesVouchers.xsd",
			"xmlns:arch": "http://www.stormware.cz/schema/version_2/archive.xsd",
			"xmlns:req": "http://www.stormware.cz/schema/version_2/productRequirement.xsd",
			"xmlns:mov": "http://www.stormware.cz/schema/version_2/movement.xsd",
			"xmlns:rec": "http://www.stormware.cz/schema/version_2/recyclingContrib.xsd",
			"xmlns:srv": "http://www.stormware.cz/schema/version_2/service.xsd",
			"xmlns:rul": "http://www.stormware.cz/schema/version_2/rulesPairing.xsd",
			"xmlns:lwl": "http://www.stormware.cz/schema/version_2/liquidationWithoutLink.xsd",
			"xmlns:dis": "http://www.stormware.cz/schema/version_2/discount.xsd",
			"xmlns:lqd": "http://www.stormware.cz/schema/version_2/automaticLiquidation.xsd",
			"xmlns:uag": "http://www.stormware.cz/schema/version_2/userAgenda.xsd",
			"xmlns:apf": "http://www.stormware.cz/schema/version_2/advancePartFulfilment.xsd"
		})
		.ele('dat:dataPackItem', {id: 'n8n-datapack1', version: '2.0'});
}

export function generatePrintRequest(entityIco: string, agenda: string, reportId: string, id: string, fileName: string): string {
	const xml = createRootEnvelope(entityIco);

	// Add the print request structure
	const printElement = xml.ele('prn:print', {version: '1.0'});

	// Add record element with agenda and filter
	const recordElement = printElement.ele('prn:record', {agenda: agenda});
	if (id)
		recordElement.ele('ftr:filter').ele('ftr:id').txt(id).up().up(); // Add filter id

	// Add printer settings
	const printerSettings = printElement.ele('prn:printerSettings');

	// Add report information
	printerSettings.ele('prn:report').ele('prn:id').txt(reportId).up(); // Add report id

	// Add PDF settings
	const pdfElement = printerSettings.ele('prn:pdf');
	pdfElement.ele('prn:fileName').txt(fileName); // Replace with your actual file name
	const binaryDataElement = pdfElement.ele('prn:binaryData');
	binaryDataElement.ele('prn:responseXml').txt('true'); // Set responseXml to true

	return xml.end({prettyPrint: true});
}

export function generateListRequest(entityIco: string, actionEntity: string, listAttrs: any, filter: ListInvoicesFilter, limit?: ListLimit): string {
	const {id, extId, dateFrom, dateTill, lastChanges, ico, companyName} = filter;

	let reqEntity = listAttrs.request;
	delete listAttrs.request;

	let prefix = actionEntity.split(":")[0];

	const xml = createRootEnvelope(entityIco).ele(actionEntity, listAttrs);

	if (limit && (limit.count || limit.idFrom)) {
		const limitElement = xml.ele(prefix + ':limit');
		if (limit.count) {
			limitElement.ele('ftr:count').txt(limit.count.toString()).up();
		}
		if (limit.idFrom != null) {
			limitElement.ele('ftr:idFrom').txt(limit.idFrom.toString()).up();
		}
		limitElement.up();
	}

	if (reqEntity) {
		const requestElement = xml.ele(reqEntity);
		const filterElement = requestElement.ele('ftr:filter');

		// Add filter elements dynamically
		if (id) filterElement.ele('ftr:id').txt(id).up();
		if (extId) filterElement.ele('ftr:extId').txt(extId).up();
		if (dateFrom) filterElement.ele('ftr:dateFrom').txt(dateFrom).up();
		if (dateTill) filterElement.ele('ftr:dateTill').txt(dateTill).up();
		if (lastChanges) filterElement.ele('ftr:lastChanges').txt(lastChanges).up();
		if (companyName && prefix === 'lst') filterElement.ele('ftr:selectedCompanys').ele('ftr:company').txt(iconv.encode(companyName, "win1250").toString()).up();
		else if (companyName) filterElement.ele('ftr:company').txt(companyName).up();

		// lst have different ico filter parameter
		if (ico && prefix === 'lst') filterElement.ele('ftr:selectedIco').ele('ftr:ico').txt(ico).up();
		else if (ico) filterElement.ele('ftr:ico').txt(ico).up();

		filterElement.up();
		requestElement.up();
	}

	return xml.end({prettyPrint: true});
}
