import { Plus, Trash2 } from "lucide-react";

export const Field = ({ label, ...props }) => {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        {...props}
        className="h-11 rounded border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
      />
    </label>
  );
};

export const TextArea = ({ label, ...props }) => {
  return (
    <label className="grid gap-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        {...props}
        className="min-h-28 resize-y rounded border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
      />
    </label>
  );
};

export const SectionTitle = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
    </div>
  );
};

export const AddButton = ({ children, ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className="flex h-10 items-center justify-center gap-2 rounded border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
    >
      <Plus size={16} />
      <span>{children}</span>
    </button>
  );
};

export const RemoveButton = ({ ...props }) => {
  return (
    <button
      type="button"
      {...props}
      className="grid h-9 w-9 place-items-center rounded border border-rose-200 text-rose-600 transition hover:bg-rose-50"
      title="Remove"
      aria-label="Remove"
    >
      <Trash2 size={16} />
    </button>
  );
};
