import { AppConfiguration } from "../abstractions";
import { DopplerLegacyClientImpl } from "./DopplerLegacyClientImpl";
import { AxiosRequestConfig, AxiosResponse, AxiosStatic } from "axios";
import { DopplerLegacyUserData } from "../abstractions/doppler-legacy-client";

describe(DopplerLegacyClientImpl.name, () => {
  it("should be return a legacy user data successfully", async () => {
    // Arrange
    const dopplerUserDataMock: DopplerLegacyUserData = {
      jwtToken: "session_token",
      unlayerUser: {
        id: "user_id",
        signature: "user_signature",
      },
    };
    const axiosInstanceMock = {
      create() {
        return {
          async get(
            url: string,
            config?: AxiosRequestConfig
          ): Promise<AxiosResponse<DopplerLegacyUserData | any>> {
            await setTimeout(() => {}, 1000);
            return {
              data: {
                ...dopplerUserDataMock,
                urlBase: "https://fake.urlbase.fromdoppler.net/",
              },
              status: 200,
              statusText: "OK",
              headers: {},
              config: {},
              request: {},
            };
          },
        };
      },
    } as AxiosStatic;

    const appConfigurationResult = {} as unknown as AppConfiguration;
    const dopplerLegacyInstance = new DopplerLegacyClientImpl({
      axiosStatic: axiosInstanceMock,
      appConfiguration: appConfigurationResult,
    });

    // Act
    const result = await dopplerLegacyInstance.getDopplerUserData();

    // Assert
    expect(result).toEqual({
      success: true,
      value: dopplerUserDataMock,
    });
  });

  it("should be return error object", async () => {
    const errorMock = new Error("Network Error");
    const axiosInstanceMock = {
      create() {
        return {
          async get(
            url: string,
            config?: AxiosRequestConfig
          ): Promise<AxiosResponse<DopplerLegacyUserData | any>> {
            await setTimeout(() => {}, 1000);
            throw errorMock;
          },
        };
      },
    } as AxiosStatic;
    const appConfigurationResult = {} as unknown as AppConfiguration;
    const dopplerLegacyInstance = new DopplerLegacyClientImpl({
      axiosStatic: axiosInstanceMock,
      appConfiguration: appConfigurationResult,
    });

    // Act
    const result = await dopplerLegacyInstance.getDopplerUserData();

    // Assert
    expect(result).toEqual({
      success: false,
      unexpectedError: errorMock,
    });
  });
});
