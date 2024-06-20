import Image from "next/image";
import { JetBrains_Mono } from "next/font/google";
import useAlloyHooks from "../useAlloyHooks";

const jetbrains = JetBrains_Mono({ subsets: ["latin"] });

const Home = () => {
  const {
    createUser,
    getIntegrations,
    getAuthFields,
    getOAuthUrl,
    getCredentialId,
    getInstallationlIdAndCompleteInstallation,
    handleShopSubdomainInput,
    credentialId,
    msg,
    OAuthUrl,
    integrations,
    userId,
    fields,
    shopSubdomain,
  } = useAlloyHooks();

  const triggerAuthFieldsModal = () => {
    getAuthFields();
    document.getElementById("my_modal_2").showModal();
  };

  return (
    <div className={`bg-white min-h-screen ${jetbrains.className}`}>
      {/* Titles */}
      <div className="grid grid-cols-4 gap-5 mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mr-10">
            Step 1: Create User
          </h2>
          <button className="btn mt-2 block" onClick={createUser}>
            Create a User
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 2: List Integrations
          </h2>
          <button className="btn mt-2" onClick={getIntegrations}>
            Get integrations
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 3: Get Auth Fields
          </h2>
          <p className="text-gray-900">
            Click "install" next to the integrations to fetch the auth fields
            for Shopify.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 4: Get OAuth URL
          </h2>
          <p className="text-gray-900">Complete this step via the modal.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 5: Click the OAuthURl
          </h2>
          <p className="text-gray-900">
            After entering the correct Shop subdomain in the input field, the
            OAuthURL will be displayed below.
          </p>
          {OAuthUrl && (
            <a
              href={OAuthUrl.oauthUrl}
              className="text-primary"
              target="_blank"
            >
              Click OAuth URL
            </a>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 6: Get CredentialID
          </h2>
          <button className="btn mt-2" onClick={getCredentialId}>
            Get CredentialID
          </button>
          {credentialId && <p className="text-primary">Success</p>}
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 7: Get InstallationID, Start and Complete Installation
          </h2>
          <button
            className="btn mt-2"
            onClick={getInstallationlIdAndCompleteInstallation}
          >
            Get InstallationID
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Step 8: Final status
          </h2>
          <p className="text-primary">{msg}</p>
        </div>
      </div>

      {/* End Titles */}

      {/* List Integrations */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Integrations{" "}
        </h2>
        <div>
          {userId && (
            <p className="font-bold tracking-tight text-gray-900 mr-10">
              UserId:
              <span className="badge">{userId}</span>
            </p>
          )}
        </div>

        <div className="mt-1 text-black grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {integrations?.map((integration) => (
            <div key={integration.id}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={integration.icon}
                  alt="Front of men&#039;s Basic Tee in black."
                  className="h-full w-full object-contain object-center lg:h-full lg:w-full"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">{integration.app}</a>
                  </h3>
                </div>
                <button
                  onClick={() => triggerAuthFieldsModal()}
                  className="text-sm font-medium text-gray-900 hover:text-green-600"
                >
                  Install
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* End of List Integrations */}

      {/* AuthFields Modal */}

      <dialog id="my_modal_2" className={`modal`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Connect to Shopify</h3>
          <form method="dialog" className="modal-backdrop form-control w-full">
            {/* Authfields Input */}

            <p class="label-text my-3">
              {fields && fields?.properties[0]?.displayName}
            </p>

            <input
              type="text"
              placeholder="e.g exampledomain"
              class="input input-bordered w-full max-w-xs text-white"
              value={shopSubdomain}
              onChange={handleShopSubdomainInput}
            />
            <p class="label-text-alt text-xs mt-2">
              {fields && fields?.properties[0]?.description}
            </p>

            {/* End Authfields Input */}
            <button>close</button>
          </form>

          <button className="btn" onClick={getOAuthUrl}>
            Step 4: Get OAuthURL
          </button>
        </div>
      </dialog>

      {/* End of AuthFields Modal */}
    </div>
  );
};

export default Home;
