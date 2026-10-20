(() => {
  const select = document.querySelector('#ux-permission');
  if (!select) return;
  const conflict = document.querySelector('#ux-conflict');
  const status = document.querySelector('#ux-save-status');
  const audit = document.querySelector('#ux-audit-list');
  const record = message => { const li = document.createElement('li'); li.textContent = message; audit.prepend(li); };
  const updateConflict = () => { conflict.hidden = !['Edit', 'Full Admin'].includes(select.value); };
  select.addEventListener('change', updateConflict);
  document.querySelector('#ux-resolve').addEventListener('click', () => {
    select.value = 'Read'; updateConflict();
    status.textContent = 'Conflict resolved in the draft. Apply to confirm Read access.';
  });
  document.querySelector('#ux-apply').addEventListener('click', () => {
    updateConflict();
    if (!conflict.hidden) { status.textContent = 'Not applied: this grant exceeds the inherited Read-only policy. Resolve the conflict first.'; return; }
    status.textContent = `Permission applied in this concept: ${select.value}.`;
    record(`Resource Access updated to ${select.value} · External Contractor · concept action.`);
  });
  const grantDialog = document.querySelector('#ux-grant-dialog');
  const auditDialog = document.querySelector('#ux-audit-dialog');
  document.querySelector('#ux-grant').addEventListener('click', () => grantDialog.showModal());
  document.querySelector('#ux-audit-open').addEventListener('click', () => auditDialog.showModal());
  document.querySelectorAll('[data-close-ux]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
  document.querySelector('#ux-grant-form').addEventListener('submit', event => {
    event.preventDefault();
    const start = document.querySelector('#ux-start').value, end = document.querySelector('#ux-end').value;
    const error = document.querySelector('#ux-date-error');
    if (end <= start) { error.textContent = 'Expiry must be later than the start date.'; return; }
    error.textContent = '';
    document.querySelector('#ux-date-summary').textContent = `${start} – ${end}`;
    document.querySelector('#ux-access-status').textContent = `Scheduled in this concept · starts ${start}, automatically expires ${end}.`;
    record(`Jordan Lee · temporary access scheduled ${start} through ${end} · concept action.`);
    grantDialog.close();
  });
})();
