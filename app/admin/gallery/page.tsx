import { getGalleryItems } from "@/lib/actions/gallery";
import GalleryClient from "./GalleryClient";

export default async function GalleryPage() {
    const { items } = await getGalleryItems();

    return (
        <div className="space-y-6">
            <GalleryClient initialItems={items || []} />
        </div>
    );
}
