#!/usr/bin/env python3
"""
Data Organization Script for KI-Projekt
Helps organize and categorize data files
"""

import json
import os
import shutil
from pathlib import Path
from typing import Dict, List


class DataOrganizer:
    """Organizes data files into appropriate directories"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.categories = {
            'instructions': ['instruction', 'system', 'directive'],
            'prompts': ['prompt', 'user', 'query', 'question'],
            'examples': ['example', 'sample', 'demo', 'test'],
            'templates': ['template', 'pattern', 'format']
        }
    
    def categorize_file(self, filepath: Path) -> str:
        """Determine the appropriate category for a file"""
        filename = filepath.stem.lower()
        
        # Check file content if it's a JSON file
        if filepath.suffix == '.json':
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Check metadata for category hints
                if isinstance(data, dict):
                    if 'category' in data:
                        return data['category']
                    
                    if 'metadata' in data and isinstance(data['metadata'], dict):
                        if 'category' in data['metadata']:
                            return data['metadata']['category']
                    
                    # Check content type
                    for category, keywords in self.categories.items():
                        for keyword in keywords:
                            if keyword in str(data).lower()[:500]:
                                return category
            except:
                pass
        
        # Check filename for category hints
        for category, keywords in self.categories.items():
            for keyword in keywords:
                if keyword in filename:
                    return category
        
        return 'general'
    
    def organize_file(self, filepath: Path, dry_run: bool = False) -> str:
        """Move file to appropriate category directory"""
        category = self.categorize_file(filepath)
        
        # Create category directory if needed
        target_dir = self.data_dir / category
        if not dry_run:
            target_dir.mkdir(parents=True, exist_ok=True)
        
        # Determine target path
        target_path = target_dir / filepath.name
        
        # Move file
        if not dry_run:
            if target_path.exists():
                print(f"  ⚠ File already exists at {target_path}, skipping")
                return category
            shutil.move(str(filepath), str(target_path))
            print(f"  ✓ Moved {filepath.name} → {category}/")
        else:
            print(f"  [DRY RUN] Would move {filepath.name} → {category}/")
        
        return category
    
    def organize_all(self, dry_run: bool = False) -> Dict[str, int]:
        """Organize all unorganized files in the data directory"""
        if not self.data_dir.exists():
            print(f"Data directory '{self.data_dir}' does not exist")
            return {}
        
        # Find files in root data directory
        root_files = [f for f in self.data_dir.iterdir() if f.is_file() and f.suffix in ['.json', '.md', '.txt']]
        
        if not root_files:
            print("No files to organize in data directory root")
            return {}
        
        print(f"\nFound {len(root_files)} file(s) to organize:\n")
        
        categories_count = {}
        for filepath in root_files:
            category = self.organize_file(filepath, dry_run)
            categories_count[category] = categories_count.get(category, 0) + 1
        
        return categories_count
    
    def print_summary(self, categories_count: Dict[str, int]) -> None:
        """Print organization summary"""
        print("\n" + "="*60)
        print("ORGANIZATION SUMMARY")
        print("="*60)
        
        total = sum(categories_count.values())
        print(f"\nTotal files organized: {total}")
        
        if categories_count:
            print("\nFiles per category:")
            for category, count in sorted(categories_count.items()):
                print(f"  {category}: {count}")
        
        print("\n" + "="*60)


def main():
    """Main entry point"""
    import sys
    
    print("KI-Projekt Data Organizer")
    print("="*60)
    
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv
    
    if dry_run:
        print("Running in DRY RUN mode (no files will be moved)\n")
    
    organizer = DataOrganizer()
    categories_count = organizer.organize_all(dry_run)
    organizer.print_summary(categories_count)
    
    if dry_run:
        print("\nRun without --dry-run to actually move files")


if __name__ == "__main__":
    main()
