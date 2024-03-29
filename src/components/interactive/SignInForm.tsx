import { Button } from "@/components/ui/button";
import { type Providers } from "@/interfaces/providers";
import { Mail } from "lucide-react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC, useEffect, useState } from "react";
import CustomIcon from "../CustomIcon";
import { CustomIconVariant, isCustomIcon } from "@/helpers/custom-icons";
import { Input } from "../ui/input";
import { Separator } from "../my-ui/separator";

const SignInForm: FC = ({}) => {
  const [providers, setProviders] = useState<Providers>();
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const resProviders = await getProviders();
      if (!resProviders) return;
      setProviders(resProviders);
    };

    fetchProviders();
  }, []);

  const handleSignInWithProvider = async (providerId: string) => {
    await signIn(providerId, {
      callbackUrl: `/auth_callback/?redirectUrl=${router.asPath}`,
    });
  };

  const handleSignInWithEmail = async () => {
    console.log("hi");
  };

  if (!providers) {
    return <></>;
  }

  const OAuthProviders = [providers.spotify];

  return (
    <div className="flex flex-col gap-4 ">
      <Input type="email" placeholder="xyz@gmail.com" className="placeholder:text-foreground/50" />
      <Button
        onClick={handleSignInWithEmail}
        className="flex gap-2 px-8 py-6 font-light uppercase tracking-widest"
      >
        <CustomIcon icon="mail" height="22px" width="22px" variant={CustomIconVariant.foreground} />
        <p>Sign in with E-Mail</p>
      </Button>
      <Separator text="or" />
      {OAuthProviders &&
        Object.values(OAuthProviders).map((provider, index) => (
          <div key={provider?.id ?? index}>
            <Button
              onClick={() => provider?.id && handleSignInWithProvider(provider.id)}
              className="flex gap-2 px-8 py-6 font-light  uppercase tracking-widest"
            >
              <CustomIcon
                icon={isCustomIcon(provider.id) ? provider.id : "fallback"}
                variant={CustomIconVariant.foreground}
              />
              <p>Sign in with {provider.name}</p>
            </Button>
          </div>
        ))}
    </div>
  );
};

export default SignInForm;
