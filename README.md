# n8n-nodes-pohoda

Toto je n8n community node, který umožňuje integraci **Pohoda** mServer od Stormware do vašich n8n workflow.

**Pohoda** je účetní software využívající **mServer XML API**, které umožňuje automatizaci každodenních
účetních operací. Díky integraci Pohoda s n8n můžete plně automatizovat své obchodní procesy, obzvláště v kombinaci s AI
nástroji.

### Screenshoty
![workflow](docs/images/workflow.png)
![screen_node](docs/images/screen_node.png)
![mcp_client](docs/images/mcp_client_setup.png)
![example_agent](docs/images/agent_example.png)
#### Sestava faktura do PDF
![pdf_export](docs/images/pdf_export.png)
#### Vytoření adresy
![address_create](docs/images/address_create.png)
#### Workflow, export do PDF a nahrání do AWS S3+DynamoDB
![pdf_export_dynamo](docs/images/pdf_export_dynamo.png)
#### Export všech záznamů
Export operace vrazí seznam entit, které odpovídají filtru. Doporučujeme použít následující strategorii pro loop více záznamů
![loop_example](docs/images/loop_records.png)

[n8n](https://n8n.io/) je platforma pro automatizaci
workflow [licencovaná fair-code licencí](https://docs.n8n.io/reference/license/).

Obsah

- [Instalace](#instalace)
- [Operace](#operace)
- [Přihlašovací údaje](#přihlášovací-údaje)
- [Kompatibilita](#kompatibilita)
- [Použití](#použití)
- [Zdroje](#zdroje)
- [Historie verzí](#historie-verzí)

## Instalace

Pro instalaci tohoto nodu postupujte
podle [instalačního návodu](https://docs.n8n.io/integrations/community-nodes/installation/) v dokumentaci n8n community
nodes.

## Operace

Tento node podporuje následující operace:

- **Vytvořit fakturu**: generuje a odesílá faktury přímo z Pohody.
- **Aktualizovat zákazníka**: upravuje údaje o zákazníkovi v databázi Pohody.
- **Načíst objednávky**: získá data o objednávkách z Pohody pro další zpracování.
- **Generovat reporty**: automatizuje vytvoření finančních reportů.

## Přihlašovací údaje

Pro použití tohoto nodu je třeba autentizovat se do mServer XML API Pohody. Postup:

1. **Předpoklady**: aktivní účet Pohoda a přístup k mServer XML API.
2. **Autentizace**: použijte `IČO`, Username` a `Password` pro autentizaci.
3. **Nastavení**: vyplňte API endpoint, uživatelské jméno a heslo v sekci přihlašovacích údajů.

## Kompatibilita

Testováno na verzích Pohody: `13907.6 (12.3.2025)` a n8n `v1.88.0`

## Použití

Tento node byl navržen tak, aby zjednodušil integraci Pohody do n8n workflow případně napojil Poohoda ERP na AI.

- **Automatizace fakturace**: použijte operaci "Vytvořit fakturu" pro automatické generování faktur na základě triggerů z jiných aplikací.
- **Kontrola zaúčtováni**: při propojení s AI modely (Např. OpenAI nebo Gemini) nechte N8N automaticky pracovat a provádět kontrolu zaúčtovaných dokladů.
- **Synchronizace zákaznických dat**: udržujte údaje o zákaznících aktuální synchronizací mezi Pohodou, CRM nebo pokladními systémy.
- **Generování finančních reportů**: naplánujte automatické vytváření reportů pro zefektivnění účetních procesů.
- **Automatické sledování plateb**: nastavte workflow, které automaticky aktualizuje stav faktur v Pohodě na základě příchozích plateb od zákazníků.
- **Notifikace o zásobách**: vytvořte workflow, které vás upozorní, když klesnou zásoby pod určitou hranici, a to pomocí integrace s e-shopem nebo skladem.
- **Import a export dat**: automatizujte import dodavatelských faktur nebo export dat pro analýzu pomocí externích nástrojů, jako je Shoptet nebo Abra Flexi.
- **Sledování objednávek**: integrujte Pohodu se systémem sledování objednávek, aby se automaticky aktualizoval stav objednávek a zákazníci byli informováni o jejich pokroku.
- **Zpracování opakovaných plateb**: nastavte automatizaci pro zpracování opakovaných plateb a fakturaci zákazníkům, kteří mají předplatné služby.
- **Integrace s marketingovými nástroji**: propojte Pohodu s nástroji pro e-mailový marketing, abyste mohli automaticky aktualizovat seznamy příjemců na základě zákaznických dat.
- **Zpracování vratek**: vytvořte workflow pro efektivní zpracování vratek a reklamací, které automaticky upraví stavy v systému Pohoda.
- **Automatizace reportů o prodeji**: naplánujte pravidelné reporty o prodeji, které se automaticky generují a zasílají relevantním členům týmu.
- **Správa dodavatelských smluv**: integrujte správu smluv s dodavateli do vašich pracovních postupů, aby byla zajištěna jejich aktualizace a dodržování podmínek.
- **Zlepšení zákaznického servisu**: propojte Pohodu s chatovacími nástroji, aby se zákaznické požadavky automaticky přeposílaly na příslušné oddělení nebo zaměstnance.

Tyto nápady vám mohou pomoci efektivně využít n8n a zjednodušit pracovní procesy v Pohoda ERP.

## Zdroje

- Dokumentace n8n: https://docs.n8n.io
- Dokumentace mServer XML API Pohody: https://www.stormware.cz/prirucka-pohoda-online/Datova_komunikace/XML_import-export/

## Jak testovat Pohoda Server

Výchozí uživatel v mPohoda serveru je `@` a prázdné heslo v Base64 formátu.

```bash
curl -d @req.xml -X POST -H "STW-Authorization: Basic QDo=" -H "Content-Type: application/xml" http://10.0.111.111:3880/xml \
| iconv -f WINDOWS-1250 -t UTF-8
```

## Historie verzí

Aktuální verzi a historii naleznete v souboru `package.json` nebo v historii projektu na GitHubu.
