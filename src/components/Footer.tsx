import voteLogo from "@/assets/vote-logo.png";

const Footer = () => {
  return (
    <footer className="bg-vote-navy py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={voteLogo} alt="V.O.T.E." className="h-8 w-8" loading="lazy" width={512} height={512} />
            <span className="font-display font-bold text-primary-foreground">V.O.T.E. Party</span>
          </div>
          <p className="text-primary-foreground/40 text-sm text-center">
            Virtual Organized Transparency Engine · Consensus-as-a-Service
          </p>
          <p className="text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} V.O.T.E. Party. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
