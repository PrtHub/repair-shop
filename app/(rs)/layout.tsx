import Header from "@/components/navigation/header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        template: "%s | FixItFast",
        default: "FixItFast",
    },
    description:
        "its a repair shop, you can repair your phone here, if you want. we will repair your phone for free.",
    applicationName: "FixItFast",
    openGraph: {
        title: "FixItFast",
        description:
            "its a repair shop, you can repair your phone here, if you want. we will repair your phone for free.",
        // images: [
        //     {
        //         url: "https://res.cloudinary.com/artifact-z7/image/upload/v1694991250/repair-shop/repair-shop_og-image.png",
        //     },
        // ],
    },
};

const RSLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-7xl mx-auto w-full p-4">
            <Header />
            <div className="px-4 py-2">{children}</div>
        </div>
    );
};

export default RSLayout;