// components/Form.tsx
"use client";


interface DialogInfoProps {
  title: string;
  caption: string;
  onSuccess: () => void;
}

export default function DialogInfo(
  { title, caption, onSuccess }: DialogInfoProps
) {
  async function handleSubmit(formData: FormData) {
    // const email = formData.get("email");
    
    // Simulate API call or trigger your Server Action
    // console.log("Submitting:", email);
    
    onSuccess(); // Close modal on success
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 border-orange-500">
      <h2 className="text-xl font-bold text-gray-400 ml-3">{title}</h2>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-300">{caption}</label>
      </div>

      <div className="flex flex-col gap-1 items-center">
        <button type="submit" className="font-semibold rounded-lg px-5 py-2 text-orange-500 hover:text-white" >OK</button>
      </div>
      
    </form>
  );
}
