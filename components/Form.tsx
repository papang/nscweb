// components/Form.tsx
"use client";

interface FormProps {
  onSuccess: () => void;
}

export default function Form({ onSuccess }: FormProps) {
  async function handleSubmit(formData: FormData) {
    const email = formData.get("email");
    
    // Simulate API call or trigger your Server Action
    console.log("Submitting:", email);
    
    onSuccess(); // Close modal on success
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Subscribe to Updates</h2>
      
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded border p-2 dark:bg-zinc-800 dark:border-zinc-700"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        className="rounded bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
