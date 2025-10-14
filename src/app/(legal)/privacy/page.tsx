import { MAIL } from "@/lib/data";

export default function Page() {
  return (
    <div className="max-w-7xl mx-auto pt-40 max-sm:pt-24 px-6  ">
      <div className=" px-6 py-14 max-sm:py-8 border border-muted-foreground rounded-xl inset-shadow-custom flex flex-col gap-6 bg-gradient-to-br from-gradient-start/10 via-gradient-via/10 to-gradient-end/10">
        <h1 className=" text-4xl max-sm:text-2xl font-semibold">Privacy Policy</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam
          aperiam, perferendis ipsa fuga modi repellat quisquam obcaecati quod
          laudantium eius ea praesentium vero natus est asperiores accusamus
          inventore, corporis incidunt!
        </p>
      </div>
      <div className=" mt-12 space-y-8">
        <div className=" space-y-2">
              <p className="mb-6">Effective Date: 10-10-2025</p>
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Information We Collect
          </h2>
          <p>
            We collect information that you provide directly to us, including:
          </p>
          <ul className=" list-disc list-inside">
            <li>
              Account Information: Name, email address, and authentication
              details provided during sign-up or sign-in.
            </li>
            <li>
              Profile Information: Username, display name, and profile image you
              choose to upload.
            </li>
            <li>
              Club and Song Data: Details about the clubs you create or join,
              songs you add or upvote, and related activity within the platform.
            </li>
            <li>
              Usage Data: Interactions with the platform (such as clicks, views,
              or votes) to help us understand engagement and improve user
              experience.
            </li>
            <li>
              Device and Log Information: Basic technical details like IP
              address, browser type, and access times to ensure platform
              security and performance.
            </li>
          </ul>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className=" list-disc list-inside">
            <li>Provide, maintain, and improve the 1BeatClub experience.</li>
            <li>
              Enable key features like club creation, song voting, and user
              invitations.
            </li>
            <li>Ensure the security and integrity of your account.</li>
            <li>
              Communicate updates, new features, or important notices about the
              service.
            </li>
            <li>
              Analyze usage patterns to make 1BeatClub more enjoyable and
              efficient.
            </li>
          </ul>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Information Sharing
          </h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information in the following
            circumstances:
          </p>
          <ul className=" list-disc list-inside">
            <li>With your explicit consent.</li>
            <li>
              With service providers who help operate our platform (such as
              hosting or analytics), under strict confidentiality agreements.
            </li>
            <li>
              To comply with legal obligations or enforce our Terms of Service.
            </li>
            <li>
              To protect the rights, safety, and security of users and the
              platform.
            </li>
          </ul>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className=" list-disc list-inside">
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
          </ul>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Cookie Policy
          </h2>
          <p>
            1BeatClub uses cookies and similar technologies to improve functionality and personalize your experience. Cookies help remember your preferences and keep you signed in. You can manage cookie settings through your browser at any time.
          </p>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">
            Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the effective date.
          </p>
        </div>
        <div className=" space-y-2">
          <h2 className=" text-2xl max-sm:text-lg font-semibold">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please reach out via our <a href="/contact">contact page</a> or
            email us at <strong>{MAIL}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
