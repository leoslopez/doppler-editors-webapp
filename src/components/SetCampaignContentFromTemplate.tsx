import { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useUpdateCampaignContentFromTemplate } from "../queries/campaign-content-queries";
import { useAppServices } from "./AppServicesContext";
import { LoadingScreen } from "./LoadingScreen";

export const SetCampaignContentFromTemplate = () => {
  const { idCampaign, idTemplate } = useParams() as Readonly<{
    idCampaign: string;
    idTemplate: string;
  }>;

  const { search } = useLocation();
  const { window } = useAppServices();
  const { mutate, isError, isIdle, isLoading, isSuccess, data, error } =
    useUpdateCampaignContentFromTemplate();

  useEffect(() => {
    mutate({ idCampaign, idTemplate });
  }, [mutate, idCampaign, idTemplate]);

  if (isIdle || isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    window.console.error(
      "Error creating campaign content from template",
      error
    );
  } else if (isSuccess && !data.success) {
    window.console.error("Error creating campaign content from template", data);
  }

  const campaignUrl = `/campaigns/${idCampaign}${search}`;
  return <Navigate to={campaignUrl} replace={true} />;
};