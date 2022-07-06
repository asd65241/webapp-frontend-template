import { XCircleIcon } from "@heroicons/react/solid";

export default function Success({ title, msg }) {
  return (
    <div className="rounded-md bg-emerald-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-emerald-800">{title}</h3>
          {msg !== undefined && (
            <div className="mt-2 text-sm text-emerald-700">
              <ul role="list" className="list-disc pl-5 space-y-1">
                <li>Your password must be at least 8 characters</li>
                <li>
                  Your password must include at least one pro wrestling
                  finishing move
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
