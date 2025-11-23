import { PostEditor } from "@/components/admin/blog/post-editor";

export default function NewPostPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Nouvel article</h1>
            <div className="bg-card border rounded-lg shadow-sm p-6">
                <PostEditor />
            </div>
        </div>
    );
}
