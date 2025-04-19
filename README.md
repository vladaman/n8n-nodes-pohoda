# n8n-nodes-pohoda

Toto je n8n community node, který umožňuje integraci **Pohoda** od Stormware do vašich n8n workflow.

**Pohoda** je komplexní účetní software využívající **mServer XML API**, které umožňuje automatizaci každodenních
účetních operací. Díky integraci Pohoda s n8n můžete plně automatizovat své obchodní procesy, obzvláště v kombinaci s AI
nástroji.

![workflow](docs/images/workflow.png)
![screen_node](docs/images/screen_node.png)

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

Testováno na verzích Pohody: 1.71.3

## Použití

Tento node byl navržen tak, aby zjednodušil integraci Pohody do n8n workflow. Tipy pro začátek:

- **Automatizace fakturace**: použijte operaci "Vytvořit fakturu" pro automatické generování faktur na základě triggerů
	z jiných aplikací.
- **Synchronizace zákaznických dat**: udržujte údaje o zákaznících aktuální synchronizací mezi Pohodou a CRM systémy.
- **Generování finančních reportů**: naplánujte automatické vytváření reportů pro zefektivnění účetních procesů.

## Zdroje

- Dokumentace n8n: https://docs.n8n.io
- Dokumentace mServer XML API Pohody: https://www.stormware.cz/en/developers/

## Jak testovat Pohoda Server

Výchozí uživatel v mPohoda serveru je `@` a prázdné heslo v Base64 formátu.

```bash
curl -d @req.xml -X POST -H "STW-Authorization: Basic QDo=" -H "Content-Type: application/xml" http://10.0.111.111:3880/xml \
| iconv -f WINDOWS-1250 -t UTF-8
```

## Historie verzí

Aktuální verzi a historii naleznete v souboru `package.json` nebo v historii projektu na GitHubu.
