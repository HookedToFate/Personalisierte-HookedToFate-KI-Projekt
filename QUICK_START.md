# Quick Start Guide

## Getting Started with KI-Projekt Data Storage

### 1. Understanding the Structure
The repository is organized to store and validate AI instruction data:
- `data/` - Main storage directory with subdirectories for different types
- `validate_data.py` - Script to check data quality
- `organize_data.py` - Script to auto-organize files

### 2. Adding New Data

#### Option A: Use Templates
```bash
# Copy a template
cp data/templates/instruction_template_v1.json data/instructions/my_new_instruction.json

# Edit the file with your content
# Then validate
python validate_data.py
```

#### Option B: Create from Scratch
Create a JSON file with this minimum structure:
```json
{
  "metadata": {
    "category": "instructions",
    "description": "Your description here",
    "purpose": "What this achieves"
  },
  "content": "Your actual content here"
}
```

### 3. Validation Checklist
Before committing new data, ensure:
- ✅ File is in correct category directory
- ✅ Metadata is complete
- ✅ Content is coherent and logical
- ✅ Purpose is clear
- ✅ Validation passes: `python validate_data.py`

### 4. Organization Tips
- Use descriptive filenames: `[category]_[description]_[version].json`
- Keep files focused on one purpose
- Add version numbers for tracking changes
- Document complex structures in comments

### 5. Common Workflows

#### Workflow 1: Add Single Instruction
```bash
# 1. Create file in appropriate directory
echo '{"metadata": {...}, "instruction": "..."}' > data/instructions/my_instruction.json

# 2. Validate
python validate_data.py

# 3. Commit (done automatically by GitHub Copilot)
```

#### Workflow 2: Batch Organization
```bash
# 1. Place files in data/ root
# 2. Preview organization
python organize_data.py --dry-run

# 3. Apply organization
python organize_data.py

# 4. Validate all
python validate_data.py
```

### 6. Quality Standards

#### Coherence
- Data should be internally consistent
- Related information should be grouped
- Structure should be predictable

#### Logic
- Instructions should follow reasonable patterns
- No contradictions within a file
- Clear cause-and-effect relationships

#### Usefulness
- Each file should have a clear purpose
- Content should be actionable
- Examples should be relevant

### 7. Troubleshooting

**Validation fails with JSON error:**
- Check JSON syntax at jsonlint.com
- Ensure all quotes are properly escaped
- Verify commas are correct

**Organization script doesn't categorize correctly:**
- Add explicit "category" field in metadata
- Use keywords from categories in filename
- Manually place in correct directory

**Need help?**
- Check existing examples in `data/examples/`
- Review templates in `data/templates/`
- Consult `data/README.md` for details

### 8. Best Practices
1. **Version your data**: Use version numbers in filenames
2. **Document everything**: Add metadata to all files
3. **Test before commit**: Always run validation
4. **Stay organized**: Use the organize script regularly
5. **Keep it simple**: Don't overcomplicate structures
6. **Be consistent**: Follow existing patterns
7. **Update regularly**: Review and refresh old data
8. **Backup important data**: Use git commits frequently

## Need More Help?
- See `README.md` for detailed documentation
- Check `data/README.md` for data format specifics
- Review example files for patterns
