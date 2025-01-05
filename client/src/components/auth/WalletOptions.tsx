import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Config, Connector, CreateConnectorFn } from 'wagmi';
import { ConnectMutate } from 'wagmi/query';

interface WalletOptionsProps {
  label: String;
  connectors: readonly Connector<CreateConnectorFn>[];
  connect: ConnectMutate<Config, unknown>;
}

const WalletOptions = ({ label, connectors, connect }: WalletOptionsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer w-32 h-7 md:h-9 mt-4 md:mt-8 mx-auto text-black dark:text-neutral-800 bg-neutral-300 rounded-md">
        {label}
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full justify-center items-center max-w-[26rem]">
        <DialogHeader className="flex flex-col w-full justify-center items-center">
          <div className="flex justify-start items-center gap-3 my-3 mb-12">
            <img src="/logo.svg" alt="logo" className="h-9 w-9" />
            <h3 className="font-audio-wide text-4xl text-white">Patron</h3>
          </div>
          <DialogTitle className="text-2xl">Connect Wallet</DialogTitle>
          <DialogDescription className="w-full text-center text-neutral-500">
            Connect your wallet to Patron to get started. Patron supports multiple wallets.
          </DialogDescription>
        </DialogHeader>
        <ul className="w-full flex flex-col gap-1 justify-center items-center mt-6">
          {connectors.map((each) => (
            <li
              key={each.uid}
              onClick={() => connect({ connector: each })}
              className={`w-full cursor-pointer p-3 rounded-md border border-PATRON_BORDER_COLOR flex justify-between items-center gap-3 ${each.name === 'Injected' ? 'hidden' : ''} bg-neutral-800/30`}
            >
              <div className="flex justify-start items-center gap-2">
                <img
                  src={each.icon}
                  alt={each.name}
                  className={`h-9 w-9 rounded-md ${each.name === 'MetaMask' ? 'bg-white h-8 w-8 p-1 px-2' : ''}`}
                />
                <h4 className="text-md text-neutral-400">{each.name}</h4>
              </div>
              <h4 className="text-sm text-neutral-600">Detected</h4>
            </li>
          ))}
        </ul>
        <p className="w-full flex justify-start items-center my-5 text-neutral-500 text-xs text-center">
          By connecting a wallet, you agree to Uniswap Labs’ Terms of Service and consent to its
          Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default WalletOptions;
