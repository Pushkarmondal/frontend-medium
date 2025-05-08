export function Avatar({name}: {name: string}) {
      return <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-slate-600 text-lg dark:text-gray-300">{name[0]}</span>
      </div>

}