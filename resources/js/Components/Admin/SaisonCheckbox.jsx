export default function SaisonCheckbox({
    saison,
    enabled,
    checked,
    index,
    handleSaisonChange,
}) {
    return (
        <>
            <input
                className={
                    (!enabled ? "border-slate-300 " : "border-[#2563eb] ") +
                    (index > 0 ? "ml-8 " : "") +
                    "self-center rounded mr-2"
                }
                onChange={() => handleSaisonChange(index)}
                disabled={!enabled}
                checked={!enabled ? false : checked}
                type="checkbox"
                id={saison}
                name="saisonChoix"
                value={saison}
            />
            <label className="text-sm" htmlFor={saison}>
                {saison}
            </label>
        </>
    );
}
