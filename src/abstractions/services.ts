import { AppConfiguration } from ".";
import { AppConfigurationRenderer } from "./app-configuration-renderer";

// TODO: Determine if defining this type based on a list of types possible,
// for example based on this type:
// type AppServicesTuple = [ Window, AppConfiguration ]
export type AppServices = {
  window: Window;
  appConfiguration: AppConfiguration;
  appConfigurationRenderer: AppConfigurationRenderer;
};