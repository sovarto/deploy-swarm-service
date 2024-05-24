import * as core from '@actions/core';
import { deploy } from '@sovarto/pipelines-deploy-service-core';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
    try {
        const servicesDefinitionFile = core.getInput('services-definition', { required: true });
        const stackName = core.getInput('stack-name', { required: true });
        const remoteStateAccessToken = core.getInput('remote-state-access-token', { required: true });

        await deploy(stackName, remoteStateAccessToken, servicesDefinitionFile);
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error);
        } else {
            core.setFailed(`Unknown error of type '${ typeof error }${ typeof error === 'object'
                                                                       ? ` / ${ error!.constructor.name }`
                                                                       : '' }' occurred:\n\n${error}`);
        }
    }
}
