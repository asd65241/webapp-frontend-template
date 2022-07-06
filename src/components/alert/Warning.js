import { XCircleIcon } from "@heroicons/react/solid";

export default function Warning({ title, msg }) {
  return (
    <div className="rounded-md bg-amber-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-amber-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-amber-800">{title}</h3>
          {msg !== undefined && (
            <div className="mt-2 text-sm text-amber-700">
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
