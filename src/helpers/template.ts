import * as fs from "fs";
import * as path from "path";
import { Template } from "../types/template-type";
import { IAutomataStateMapping } from "../types/automata-state-mapping";
import { automataOptions } from "../config/automata-options";
import { ITemplateResponse } from "../types/template-response";

/**
 * Helper for create template.
 *
 * @class TemplateHelper
 */
class TemplateHelper {
    /**
     * Open template by type
     *
     * @private
     * @param {Template} type
     * @returns
     * @memberof TemplateHelper
     */
    private openTemplate(type: Template) {
        const filePath = path.join(__dirname, `../../templates/${type}.c`);
        const template = fs.readFileSync(filePath, { encoding: "utf-8" });

        return template;
    }

    /**
     * Generate template of type 'Function'
     *
     * @private
     * @returns {ITemplateResponse}
     * @memberof TemplateHelper
     */
    private generateWithFunction(): ITemplateResponse {
        const isFinalState = (stateIndex: number) => automataOptions.finalStates.indexOf(stateIndex) >= 0;

        const head = automataOptions.stateMapping
            .map((state, index) => `void E${index}();`)
            .join("\n");

        const implementation = automataOptions.stateMapping
            .map((state, index) => `

void E${index}() {
    i++;
    ${state.map(mapping => `
    if (m[i] == '${mapping.symbol}') {
        E${mapping.state}();
        return;
    }
    `).join("")} ${isFinalState(index) ? `
    if (m[i] == '\\0') {
        aceita();
        return;
    }
    ` : ``}
    rejeita();
}`).join("");
        
        return {
            head: head + implementation,
            main: `E${automataOptions.initialState}();`
        };
    }

    /**
     * Generate template of type 'GoTo'
     *
     * @returns {ITemplateResponse}
     * @memberof TemplateHelper
     */
    public generateWithGoTo(): ITemplateResponse {
        const isFinalState = (stateIndex: number) => automataOptions.finalStates.indexOf(stateIndex) >= 0;

        const implementation = automataOptions.stateMapping
            .map((state, index) => `
E${index}:
    i++;
    ${state.map(mapping => `
    if (m[i] == '${mapping.symbol}') {
        goto E${mapping.state};
    }
    `).join("")} ${isFinalState(index) ? `
    if (m[i] == '\\0') {
        goto aceita;
    }
    ` : ``}
    goto rejeita;
`).join("");
        
        return {
            main:  `goto E${automataOptions.initialState};
${implementation}`
        }
    }

    /**
     * Generate template
     *
     * @memberof TemplateHelper
     */
    public generateTemplate() {
        let file = this.openTemplate(automataOptions.templateType);
        let templateGenerated: ITemplateResponse;

        if (automataOptions.templateType === Template.Function) {
            templateGenerated = this.generateWithFunction();
        } else if (automataOptions.templateType === Template.GoTo) {
            templateGenerated = this.generateWithGoTo();
        }

        file = file.replace("<% head %>", templateGenerated.head || "");
        file = file.replace("<% main %>", templateGenerated.main || "");

        const outputPath = path.join(process.cwd(), `/output/${automataOptions.templateType}.c`);
        fs.writeFileSync(outputPath, file, { encoding: "utf-8" });
    }
}

export const templateHelper = new TemplateHelper();